--Medio de Pago

CREATE TABLE pago.medio_pago (
	id numeric DEFAULT 0 NOT NULL,
	tipo varchar(100) DEFAULT '' NOT NULL,
	nombre varchar(100) DEFAULT '' NOT NULL,
	CONSTRAINT medio_pago_pk PRIMARY KEY (id)
);
COMMENT ON TABLE pago.medio_pago IS 'Define los medios de pago que soporta el sistema';

-- Column comments

COMMENT ON COLUMN pago.medio_pago.id IS 'Identificador del medio de pago';
COMMENT ON COLUMN pago.medio_pago.tipo IS 'Define el tipo de medio de pago como lo es tarjeta de crédito, o efectivo';
COMMENT ON COLUMN pago.medio_pago.nombre IS 'Nombre del medio de pago, por ejemplo: Visa, MasterCard';


--Promoción

CREATE TABLE pago.promocion (
  id numeric DEFAULT 0 NOT NULL,
  porcentaje decimal DEFAULT 0 NOT NULL,
  codigo varchar(50) DEFAULT '' NOT NULL,
  esta_disponible boolean DEFAULT false NOT NULL,
  CONSTRAINT promocion_pk PRIMARY KEY (id)
);
COMMENT ON TABLE pago.promocion IS 'Almacena la información de las promociones del sistema';
-- Column comments
COMMENT ON COLUMN pago.promocion.id IS 'Identificador de las promociones';
COMMENT ON COLUMN pago.promocion.porcentaje IS 'Define el valor que debe descontarse por cada viaje';
COMMENT ON COLUMN pago.promocion.codigo IS 'Define el código de la promoción';
COMMENT ON COLUMN pago.promocion.esta_disponible IS 'Disponible (true), No Disponible (false)';


--Pago

CREATE TABLE pago.pago (
  id numeric DEFAULT 0 NOT NULL,
  viaje_id numeric DEFAULT 0 NOT NULL,
  medio_pago_id numeric DEFAULT 0 NOT NULL,
  promocion_id numeric DEFAULT 0 NOT NULL,
  valor_total decimal DEFAULT 0 NOT NULL,
  comision decimal DEFAULT 0 NOT NULL,
  valor_impuestos decimal DEFAULT 0 NOT NULL,
  CONSTRAINT viaje_pk PRIMARY KEY (id),
  CONSTRAINT pago_viaje_fk FOREIGN KEY (viaje_id) REFERENCES transporte.viaje(id),
  CONSTRAINT pago_medio_pago_fk FOREIGN KEY (medio_pago_id) REFERENCES pago.medio_pago(id),
  CONSTRAINT pago_promocion_fk FOREIGN KEY (promocion_id) REFERENCES pago.promocion(id)
);
COMMENT ON TABLE pago.pago IS 'Almacena los viajes';
-- Column comments
COMMENT ON COLUMN pago.pago.id IS 'Identificador del viaje';
COMMENT ON COLUMN pago.pago.viaje_id IS 'Identificador del viaje';
COMMENT ON COLUMN pago.pago.medio_pago_id IS 'Identificador del medio de pago';
COMMENT ON COLUMN pago.pago.promocion_id IS 'Identificador de la promoción';
COMMENT ON COLUMN pago.pago.valor_total IS 'Define el valor que el solicitante cancela';
COMMENT ON COLUMN pago.pago.comision IS 'Define la comisión que se otorga al sistema por cada viaje';
COMMENT ON COLUMN pago.pago.valor_impuestos IS 'Define el valor del impuesto que se le aplica al pago';


--Referido

CREATE TABLE pago.referido (
  id numeric DEFAULT 0 NOT NULL,
  usuario_id numeric DEFAULT 0 NOT NULL,
  correo varchar(250) DEFAULT '' NOT NULL,
  telefono varchar(30) DEFAULT '' NOT NULL,
  CONSTRAINT referido_pk PRIMARY KEY (id),
  CONSTRAINT referido_usuario_fk FOREIGN KEY (usuario_id) REFERENCES seguridad.usuario(id)
);
COMMENT ON TABLE pago.referido IS 'Almacena los referidos de los usuarios';

-- Column comments

COMMENT ON COLUMN pago.referido.usuario_id IS 'Define el identificador del usuario quien referido a la persona';
COMMENT ON COLUMN pago.referido.correo IS 'Define el correo del referido';
COMMENT ON COLUMN pago.referido.telefono IS 'Almacena el número de teléfono del referido';
