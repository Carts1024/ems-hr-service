import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('payroll-employees')
  async getEmployeesForPayroll(@Query('date') dateStr: string) {
    // Validate dateStr exists and is a valid date
    if (!dateStr) {
      throw new BadRequestException('Missing date query parameter');
    }
    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD');
    }

    return this.financeService.getEmployeesForPayroll(parsedDate);
  }

  // NEW ENDPOINT: date range
  @Get('payroll-employees-range')
  async getEmployeesForPayrollRange(
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    if (!start || !end) {
      throw new BadRequestException(
        'Missing start or end date query parameters',
      );
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException(
        'Invalid start or end date format. Use YYYY-MM-DD',
      );
    }

    return this.financeService.getEmployeesForPayrollRange(startDate, endDate);
  }
}
