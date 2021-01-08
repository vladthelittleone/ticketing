import { Publisher, OrderCreatedEvent, Subjects } from '@vtlotickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
