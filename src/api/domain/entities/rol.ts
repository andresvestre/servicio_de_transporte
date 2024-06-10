export class Rol {
  private constructor(readonly id: number, readonly nombre: string) { }

  static Administrador: Rol = new Rol(10, 'Administrador')
  static Solicitante: Rol = new Rol(20, 'Solicitante')
  static Conductor: Rol = new Rol(30, 'Conductor')
  static Agente: Rol = new Rol(40, 'Agente')
}
