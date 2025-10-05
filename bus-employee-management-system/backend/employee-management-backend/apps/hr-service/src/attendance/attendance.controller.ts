/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // Get all attendances
  @Get()
  getAllAttendances() {
    return this.attendanceService.getAllAttendances();
  }

  @Get('date/:date')
  getAttendancesByDate(@Param('date') dateString: string) {
    const date = new Date(dateString);
    return this.attendanceService.getAttendancesByDate(date);
  }
  // Get a single attendance by id
  @Get(':id')
  getAttendanceById(@Param('id') id: string) {
    return this.attendanceService.getAttendanceById(Number(id));
  }

  // Get all attendances by employeeId
  @Get('employee/:employeeId')
  getAttendancesByEmployee(@Param('employeeId') employeeId: string) {
    return this.attendanceService.getAttendancesByEmployee(employeeId);
  }
  // Create a new attendance record for a specific employee
  @Post('employee/:employeeId')
  createAttendanceForEmployee(
    @Param('employeeId') employeeId: string,
    @Body() data: {
      date: Date;
      status: string;
      timeIn?: Date;
      timeOut?: Date;
      remarks?: string;
      isHoliday?: boolean;
      overtimeHours?: number;
      overtimeReason?: string;
    },
  ) {
    return this.attendanceService.createAttendance({ ...data, employeeId });
  }
  // Create a new attendance record
  @Post()
  createAttendance(
    @Body()
    data: {
      employeeId: string;
      date: Date;
      status: string;
      timeIn?: Date;
      timeOut?: Date;
      remarks?: string;
      isHoliday?: boolean;
      overtimeHours?: number;
      overtimeReason?: string;
    },
  ) {
    return this.attendanceService.createAttendance(data);
  }

  // Update an attendance record
  @Put(':id')
  updateAttendance(
    @Param('id') id: string,
    @Body()
    data: {
      employeeId?: string;
      date?: Date;
      status?: string;
      timeIn?: Date;
      timeOut?: Date;
      remarks?: string;
      isHoliday?: boolean;
      overtimeHours?: number;
      overtimeReason?: string;
    },
  ) {
    return this.attendanceService.updateAttendance(Number(id), data);
  }

  // Delete an attendance record
  @Delete(':id')
  deleteAttendance(@Param('id') id: string) {
    return this.attendanceService.deleteAttendance(Number(id));
  }
}
