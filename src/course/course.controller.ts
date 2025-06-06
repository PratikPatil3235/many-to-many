import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { DeleteResult } from 'typeorm';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';

@Controller('course')
@UsePipes(new ValidationPipe())
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.courseService.create(createCourseDto);
  }

  @Post(':id')
  async addStudentInCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() studentDTO: CreateStudentDto,
  ): Promise<Course> {
    return await this.courseService.addStudentInCourse(id, studentDTO);
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return await this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course | null> {
    return await this.courseService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return await this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.courseService.remove(+id);
  }
}
