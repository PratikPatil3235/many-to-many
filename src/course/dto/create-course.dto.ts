import { IsInt, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    title: string;

    @IsInt()
    studentId: number;
    
}
