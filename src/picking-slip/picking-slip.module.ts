import { Module } from '@nestjs/common';
import { PickingSlipService } from './picking-slip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickingSlip } from 'src/database/entities/picking.slip.entity';
import { PickingSlipItem } from 'src/database/entities/picking.slip.item.entity';
import { PickingSlipDate } from 'src/database/entities/picking.slip.date.entity';
import { PickingSlipResolver } from './picking-slip.resolver';
import { PreorderSlip } from 'src/database/entities/pre-order.slip.entity';
import { PickingSlipView } from '../database/entities/picking-slip-view';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PickingSlip,
      PickingSlipItem,
      PickingSlipDate,
      PreorderSlip,
      PickingSlipView,
    ]),
  ],
  providers: [PickingSlipService, PickingSlipResolver],
})
export class PickingSlipModule {}
