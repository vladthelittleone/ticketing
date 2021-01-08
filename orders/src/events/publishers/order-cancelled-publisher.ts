import { Subjects, Publisher, OrderCancelledEvent } from '@vtlotickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
