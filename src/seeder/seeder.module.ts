import { Logger, Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickingSlip } from 'src/database/entities/picking.slip.entity';
import { PickingSlipItem } from 'src/database/entities/picking.slip.item.entity';
import { PickingSlipDate } from 'src/database/entities/picking.slip.date.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PickingSlip, PickingSlipItem, PickingSlipDate]),
  ],
  providers: [SeederService, Logger],
  exports: [SeederService],
})
export class SeederModule {}
