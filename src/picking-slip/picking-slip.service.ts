import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PickingSlip } from 'src/database/entities/picking.slip.entity';
import { PreorderSlip } from 'src/database/entities/pre-order.slip.entity';
import { Raw, Repository } from 'typeorm';
import { PickingSlipView } from '../database/entities/picking-slip-view';

@Injectable()
export class PickingSlipService {
  constructor(
    @InjectRepository(PickingSlip)
    private readonly pickingSlipRepository: Repository<PickingSlip>,

    @InjectRepository(PickingSlipView)
    private readonly pickingSlipViewRepository: Repository<PickingSlipView>,
  ) {}

  // For the default no filter picking slips
  async findAll(): Promise<PickingSlip[]> {
    return this.pickingSlipRepository.find({ relations: ['items', 'date'] });
  }

  // Selects picking_slips based on the results of the join conditions, considering printed status and pre_order_shipping date
  async getPreOrderSlips(date: String): Promise<PreorderSlip[]> {
    // Long raw SQL query below
    return this.pickingSlipRepository.manager.query(
      `SELECT 
        ps.id,
        ps.created_at,
        ps.order_fulfillment_order_id,
        COUNT(CASE WHEN ps_items.is_pre_order = 1 THEN 1 END) AS count_of_pre_order_items,
        ps_dates.printed_username,
        ps_dates.inspected_username,
        ps_dates.packed_username,
        ps_dates.shipped_username,
        ps_dates.held_username,
        ps_dates.cancelled_username,
        ps_dates.refunded_username,
        ps_dates.confirmed_username,
        ps_dates.printed_at,
        ps_dates.inspected_at,
        ps_dates.packed_at,
        ps_dates.shipped_at,
        ps_dates.delivered_at,
        ps_dates.returned_at,
        ps_dates.cancelled_at,
        ps_dates.refunded_at,
        ps_dates.held_at,
        ps_dates.confirmed_at,
        ps_dates.held_reason
      FROM picking_slips ps
      JOIN picking_slip_items ps_items ON ps.id = ps_items.picking_slip_id
      JOIN picking_slip_dates ps_dates ON ps.id = ps_dates.picking_slip_id
      WHERE DATE(ps_items.pre_order_shipping_at) = ?
        AND ps_dates.printed_at IS NOT NULL
        AND ps_dates.inspected_at IS NULL
        AND ps_dates.shipped_at IS NULL
        AND ps_dates.held_at IS NULL
      GROUP BY 
        ps.id,
        ps.created_at,
        ps.order_fulfillment_order_id,
        ps_dates.printed_username,
        ps_dates.inspected_username,
        ps_dates.packed_username,
        ps_dates.shipped_username,
        ps_dates.held_username,
        ps_dates.cancelled_username,
        ps_dates.refunded_username,
        ps_dates.confirmed_username,
        ps_dates.printed_at,
        ps_dates.inspected_at,
        ps_dates.packed_at,
        ps_dates.shipped_at,
        ps_dates.delivered_at,
        ps_dates.returned_at,
        ps_dates.cancelled_at,
        ps_dates.refunded_at,
        ps_dates.held_at,
        ps_dates.confirmed_at,
        ps_dates.held_reason;
      `,
      [date],
    );
  }

  // This queries the PickingSlipView Repository as described in src/database/entities/picking-slip-view.ts
  // It has the following collumns: picking_slip_id, order_id, created_at, picking_slip_status, has_pre_order_item
  async getPickingSlipsWithStatus(
    page: number,
    pageSize: number,
    status: string,
    // preorder: boolean,
  ): Promise<PickingSlipView[]> {
    const skip = (page - 1) * pageSize;
    return this.pickingSlipViewRepository.find({
      skip,
      take: pageSize,
      where: {
        picking_slip_status: Raw(
          (alias) => `${alias} COLLATE utf8mb4_unicode_ci = :status`, // Fixes mismatch between unicode formats of GraphQL and SQL
          { status },
        ),
        // has_pre_order_item: preorder,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }
}
