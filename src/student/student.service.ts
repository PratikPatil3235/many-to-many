import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = new Student();
    student.name = createStudentDto.name;
    return await this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find({ relations: ['course'] });
  }

  async findOne(id: number): Promise<Student | null> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['course'],
    });
    return student;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['course'],
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
