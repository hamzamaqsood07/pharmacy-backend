/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Patch,
  Get,
  Req,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import type { Request } from 'express';

@Controller('invoice')
@UseGuards(AuthGuard('jwt'))
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('add-item')
  addItemToInvoice(
    @Req() req: Request,
    @Body() body: { medicineId: string; qty: number,medDiscount: number },
  ) {
    return this.invoiceService.addItemToInvoice(
      req.user as User,
      body.medicineId,
      body.qty,
      body.medDiscount
    );
  }

  @Delete('remove-item/:medicineId')
  removeItemFromInvoice(
    @Req() req: Request,
    @Param('medicineId') medicineId: string,
  ) {
    return this.invoiceService.removeItemFromInvoice(
      req.user as User,
      medicineId,
    );
  }

  @Patch('update-item')
  updateItemQuantityInInvoice(
    @Req() req: Request,
    @Body() body: { medicineId: string; qty: number },
  ) {
    return this.invoiceService.updateItemQuantityInInvoice(
      req.user as User,
      body.medicineId,
      body.qty,
    );
  }

  @Post('finalize')
  finalizeInvoice(
    @Req() req: Request,
    @Body() body: { cashPaid: number; discountedPercentage: number,customerName?:string},
  ) {
    return this.invoiceService.finalizeInvoice(
      req.user as User,
      body.cashPaid,
      body.discountedPercentage,
      body.customerName
    );
  }

  @Get()
  getAllInvoices(@Req() req: Request) {
    return this.invoiceService.getAllInvoices(req.user as User);
  }

  @Get('currentInvoice')
  getCurrentInvoice(@Req() req: Request) {
    return this.invoiceService.getCurrentInvoice(req.user as User);
  }

  @Delete('currentInvoice')
  @UseGuards(AuthGuard('jwt'))
  async discardCurrentInvoice(@Req() req: Request) {
    const user = req.user as User;
    return this.invoiceService.discardCurrentInvoice(user);
  }
}
