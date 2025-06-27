/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { startOfDay, endOfDay } from 'date-fns'; 

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  // List all attendances (optionally, you can add filters)
  async getAllAttendances() {
    return this.prisma.attendance.findMany();
  }

  // Get a single attendance record by id
  async getAttendanceById(id: number) {
    const attendance = await this.prisma.attendance.findUnique({ where: { id } });
    if (!attendance) throw new NotFoundException('Attendance record not found');
    return attendance;
  }

  // Create an attendance record
  async createAttendance(data: {
    employeeId: string;
    date: Date;
    status: string;
    timeIn?: Date;
    timeOut?: Date;
    remarks?: string;
    isHoliday?: boolean;
    overtimeHours?: number;
    overtimeReason?: string;
  }) {
    return this.prisma.attendance.create({ data });
  }

  // Update an attendance record
  async updateAttendance(id: number, data: {
    employeeId?: string;
    date?: Date;
    status?: string;
    timeIn?: Date;
    timeOut?: Date;
    remarks?: string;
    isHoliday?: boolean;
    overtimeHours?: number;
    overtimeReason?: string;
  }) {
    try {
      const updated = await this.prisma.attendance.update({
        where: { id },
        data,
      });
      return updated;
    } catch (err) {
      throw new NotFoundException('Attendance record not found');
    }
  }

  // Delete an attendance record
  async deleteAttendance(id: number) {
    try {
      await this.prisma.attendance.delete({ where: { id } });
      return { message: 'Attendance record deleted successfully' };
    } catch (err) {
      throw new NotFoundException('Attendance record not found');
    }
  }

  // Get all attendance records for a specific employee
    async getAttendancesByEmployee(employeeId: string) {
    return this.prisma.attendance.findMany({
        where: { employeeId },
        orderBy: { date: 'desc' }, // optional: newest first
    });
    }

  async getAttendancesByDate(date: Date) {
    return this.prisma.attendance.findMany({
      where: {
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
      include: { employee: true },
      orderBy: { employeeId: 'asc' },
    });
  }
}
