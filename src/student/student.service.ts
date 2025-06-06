import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly cousreRepository: Repository<Course>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = new Student();
    student.name = createStudentDto.name;
    return await this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find({ relations: ['courses'] });
  }

  async findOne(id: number): Promise<Student | null> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['courses'],
    });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  // creating custome queries
  async selectStudentByName(name: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { name:ILike(name) },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException();
    }

    return student;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['courses'],
    });
    if (!student) {
      throw new NotFoundException(`Student With id ${id} Not Found`);
    }
    student.name = updateStudentDto.name ?? student.name;

    return await this.studentRepository.save(student);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.studentRepository.delete(id);
  }
}
