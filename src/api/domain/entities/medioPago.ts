export class MedioPago {
  private constructor(readonly id: number, readonly tipo: string, readonly nombre: string) { }

  static Visa: MedioPago = new MedioPago(10, 'Tarjeta de crédito', 'visa')
  static MasterCard: MedioPago = new MedioPago(20, 'Tarjeta de crédito', 'MasterCard')
  static Efectivo: MedioPago = new MedioPago(30, 'Efectivo', 'Efectivo')
}
