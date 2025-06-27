// finance.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { addDays } from 'date-fns';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async getEmployeesForPayroll(date: Date) {
    // This will match all records where the date falls on that day, regardless of time.
    const nextDay = addDays(date, 1);
    return this.prisma.employee.findMany({
      include: {
        position: {
          select: {
            positionName: true,
            department: { select: { departmentName: true } },
          },
        },
        attendances: {
          where: {
            date: {
              gte: date,
              lt: nextDay,
            },
          },
          select: { date: true, status: true },
        },
        benefits: {
          select: {
            benefitType: { select: { name: true } },
            value: true,
            frequency: true,
            effectiveDate: true,
            endDate: true,
            isActive: true,
          },
        },
        deductions: {
          select: {
            deductionType: { select: { name: true } },
            value: true,
            frequency: true,
            effectiveDate: true,
            endDate: true,
            isActive: true,
          },
        },
      },
    });
  }

  async getEmployeesForPayrollRange(startDate: Date, endDate: Date) {
    return this.prisma.employee.findMany({
      where: {
        NOT: { employeeStatus: 'deleted' }, // Exclude soft-deleted employees
      },
      select: {
        employeeNumber: true,
        firstName: true,
        middleName: true,
        lastName: true,
        suffix: true,
        employeeStatus: true,
        hiredate: true,
        terminationDate: true,
        basicRate: true,
        position: {
          select: {
            positionName: true,
            department: { select: { departmentName: true } },
          },
        },
        attendances: {
          where: {
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
          select: { date: true, status: true },
        },
        benefits: {
          select: {
            benefitType: { select: { name: true } },
            value: true,
            frequency: true,
            effectiveDate: true,
            endDate: true,
            isActive: true,
          },
        },
        deductions: {
          select: {
            deductionType: { select: { name: true } },
            type: true,
            value: true,
            frequency: true,
            effectiveDate: true,
            endDate: true,
            isActive: true,
          },
        },
      },
    });
  }
}
