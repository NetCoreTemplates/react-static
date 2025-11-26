/// <reference path="./api.d.ts" />
export type Config = {
  prompt:    "New Booking"
  api:       "~/MyApp.ServiceModel/Bookings.cs"
  migration: "~/MyApp/Migrations/Migration1000.cs"
  tip:       "Remove Bookings Feature: npx okai rm Bookings.d.ts",
}

export enum RoomType {
  Single,
  Double,
  Queen,
  Twin,
  Suite,
}

@Read.route("/bookings","GET")
@Read.route("/bookings/{Id}","GET")
@Read.description("Find Bookings")
@Create.description("Create a new Booking")
@tag("Bookings")
@icon({svg:"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='currentColor' d='M16 10H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1zm3-7h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1zm-5-5H8c-.55 0-1 .45-1 1s.45 1 1 1h5c.55 0 1-.45 1-1s-.45-1-1-1z'/></svg>"})
@notes("Captures a Persons Name & Room Booking information")
@description("Booking Details")
@validateHasRole("Employee")
export class Booking extends AuditBase {
  @autoIncrement()
  id: number
  @Create.description("Name this Booking is for")
  @validateNotEmpty()
  name: string
  roomType: RoomType
  @validateGreaterThan(0)
  roomNumber: number
  @intlDateTime(DateStyle.Long)
  bookingStartDate: Date
  @intlRelativeTime()
  bookingEndDate?: Date
  @intlNumber({currency:"USD"})
  @validateGreaterThan(0)
  cost: decimal
  @ref({model:"nameof(Coupon)",refId:"nameof(Coupon.Id)",refLabel:"nameof(Coupon.Description)"})
  @references("typeof(Coupon)")
  couponId?: string
  @reference()
  discount?: Coupon
  @input({type:"textarea"})
  notes?: string
  cancelled?: boolean
  @reference({selfId:"nameof(CreatedBy)",refId:"nameof(User.UserName)",refLabel:"nameof(User.DisplayName)"})
  employee: User
}

@tag("Bookings")
@icon({svg:"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='currentColor' d='M2 9.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5.5a2.5 2.5 0 1 0 0 5V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5.5a2.5 2.5 0 1 0 0-5zm2-1.532a4.5 4.5 0 0 1 0 8.064V19h16v-2.968a4.5 4.5 0 0 1 0-8.064V5H4v2.968zM9 9h6v2H9V9zm0 4h6v2H9v-2z' /></svg>"})
export class Coupon extends AuditBase {
  id: string
  description: string
  discount: number
  expiryDate?: Date
}
