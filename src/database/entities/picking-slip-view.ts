import { ViewEntity, ViewColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DateTimeScalar } from 'src/utils/date-scalar';

// This creates a table view with the following columns
// picking_slip_id, order_id, created_at, picking_slip_status, has_pre_order_item
@ViewEntity({
  expression: `
    SELECT 
      ps.id AS picking_slip_id,
      ps.order_fulfillment_order_id AS order_id,
      ps.created_at,

      -- picking_slip_status cases, can either be "printed", "not printed", "held"
      CASE
        WHEN ps_dates.printed_at IS NULL 
             AND ps_dates.inspected_at IS NULL 
             AND ps_dates.shipped_at IS NULL
             AND ps_dates.held_at IS NULL THEN 'not printed'
             
        WHEN ps_dates.printed_at IS NOT NULL 
             AND ps_dates.inspected_at IS NULL 
             AND ps_dates.shipped_at IS NULL
             AND ps_dates.held_at IS NULL THEN 'printed'
             
        WHEN ps_dates.held_at IS NOT NULL THEN 'held'
        
        ELSE NULL
      END AS picking_slip_status,

      -- has_pre_order_item aggregator, results in either true or false if count >= 1
      (
        SELECT COUNT(*)
        FROM picking_slip_items ps_items
        WHERE ps_items.picking_slip_id = ps.id 
          AND ps_items.is_pre_order = 1
      ) > 0 AS has_pre_order_item

    FROM picking_slips ps
    JOIN picking_slip_dates ps_dates ON ps.id = ps_dates.picking_slip_id
    LEFT JOIN picking_slip_items ps_items ON ps.id = ps_items.picking_slip_id
    
    GROUP BY 
      ps.id, 
      ps.order_fulfillment_order_id, 
      ps.created_at, 
      ps_dates.printed_at, 
      ps_dates.inspected_at, 
      ps_dates.shipped_at, 
      ps_dates.held_at
  `,
})
@ObjectType()
export class PickingSlipView {
  @Field(() => Int, { nullable: true })
  @ViewColumn()
  picking_slip_id: number;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  order_id: string;

  @Field(() => DateTimeScalar, { nullable: true })
  @ViewColumn()
  created_at: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  picking_slip_status: string;

  @Field(() => Boolean, { nullable: true })
  @ViewColumn()
  has_pre_order_item: boolean;
}
