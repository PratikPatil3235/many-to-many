import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { StudentModule } from 'src/student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course,Student]), StudentModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
