import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentService } from 'src/student/student.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly studentService: StudentService,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    let course = new Course();
    course.title = createCourseDto.title;

    const student = await this.studentService.findOne(
      createCourseDto.studentId,
    );
    if (!student) {
      throw new NotFoundException(
        `Student With Givan id ${createCourseDto.studentId} not found`,
      );
    }

    course.students = [student];

    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find({ relations: ['students'] });
  }

  async findOne(id: number): Promise<Course | null> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['students'],
    });
    if (!course) {
      throw new NotFoundException(`Course With id ${id} Not found`);
    }
    return course;
  }

  async addStudentInCourse(
    id: number,
    createStudentDto: CreateStudentDto,
  ): Promise<Course> {
    const student = new Student();
    student.name = createStudentDto.name;

    let course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course With id ${id} Not found`);
    }

    course.students = [student];

    return this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['students'],
    });
    if (!course) {
      throw new NotFoundException(`Course With id ${id} Not Found`);
    }

    course.title = updateCourseDto.title ?? course.title;

    if (updateCourseDto.studentId) {
      const student = await this.studentService.findOne(
        updateCourseDto.studentId,
      );
      if (!student) {
        throw new NotFoundException(
          `You have provided a wrong student id ${updateCourseDto.studentId}`,
        );
      }
      course.students.push(student);
    }

    return await this.courseRepository.save(course);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.courseRepository.delete(id);
  }
}
