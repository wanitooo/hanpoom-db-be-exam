// src/seeder/seeder.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PickingSlipDate } from 'src/database/entities/picking.slip.date.entity';
import { PickingSlip } from 'src/database/entities/picking.slip.entity';
import { PickingSlipItem } from 'src/database/entities/picking.slip.item.entity';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import * as path from 'path';

// This service reads from the .xlsx files at src/seeder/data to seed the generated database with completely all of the entries
@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(PickingSlip)
    private readonly pickingSlipRepository: Repository<PickingSlip>,

    @InjectRepository(PickingSlipItem)
    private readonly pickingSlipItemRepository: Repository<PickingSlipItem>,

    @InjectRepository(PickingSlipDate)
    private readonly pickingSlipDateRepository: Repository<PickingSlipDate>,
  ) {}

  // Seeding function
  async seed() {
    this.logger.log('Seeding database...');

    // Load and read the data files
    const pickingSlip = XLSX.readFile(
      path.join(__dirname, '../../src/seeder/data/hanpoom_picking_slips.xlsx'),
    );
    const pickingSlipItem = XLSX.readFile(
      path.join(
        __dirname,
        '../../src/seeder/data/hanpoom_picking_slip_items.xlsx',
      ),
    );
    const pickingSlipDates = XLSX.readFile(
      path.join(
        __dirname,
        '../../src/seeder/data/hanpoom_picking_slip_dates.xlsx',
      ),
    );

    const pickingSlipsSheet = pickingSlip.Sheets['Result 1'];
    const pickingSlipItemsSheet = pickingSlipItem.Sheets['Result 1'];
    const pickingSlipDatesSheet = pickingSlipDates.Sheets['Result 1'];

    // Convert sheet data to JSON for processing
    const pickingSlipsData: PickingSlip[] =
      XLSX.utils.sheet_to_json(pickingSlipsSheet);
    const pickingSlipItemsData: PickingSlipItem[] = XLSX.utils.sheet_to_json(
      pickingSlipItemsSheet,
    );
    const pickingSlipDatesData: PickingSlipDate[] = XLSX.utils.sheet_to_json(
      pickingSlipDatesSheet,
    );

    this.logger.log('Seeding picking_slips...');

    // Insert Picking Slips and get their instances
    const createdPickingSlips = [];
    for (const data of pickingSlipsData) {
      const pickingSlip = this.pickingSlipRepository.create(data);
      const savedPickingSlip =
        await this.pickingSlipRepository.save(pickingSlip);
      createdPickingSlips.push(savedPickingSlip);
    }

    this.logger.log('Seeding picking_slips_items...');

    // Insert Picking Slip Items and link to corresponding PickingSlip
    for (const data of pickingSlipItemsData) {
      const pickingSlipItem = this.pickingSlipItemRepository.create(data);
      // Find the corresponding PickingSlip based on the foreign key
      const matchingPickingSlip = createdPickingSlips.find(
        // @ts-ignore, picking_slip_id can be null
        (slip) => slip.id === data?.picking_slip_id,
      );
      if (matchingPickingSlip) {
        pickingSlipItem.picking_slip = matchingPickingSlip; // Link PickingSlip instance
        await this.pickingSlipItemRepository.save(pickingSlipItem);
      }
    }

    this.logger.log('Seeding picking_slips_dates');

    // Insert Picking Slip Dates and link to corresponding PickingSlip
    for (const data of pickingSlipDatesData) {
      const pickingSlipDate = this.pickingSlipDateRepository.create(data);
      // Find the corresponding PickingSlip based on the foreign key
      const matchingPickingSlip = createdPickingSlips.find(
        // @ts-ignore, picking_slip_id can be null
        (slip) => slip.id === data?.picking_slip_id,
      );
      if (matchingPickingSlip) {
        pickingSlipDate.picking_slip = matchingPickingSlip; // Link PickingSlip instance
        await this.pickingSlipDateRepository.save(pickingSlipDate);
      }
    }

    this.logger.log('Seeding completed!');
  }
}
