CREATE SCHEMA seguridad;
CREATE SCHEMA transporte;
CREATE SCHEMA pago;
CREATE SCHEMA soporte;

-- Tipo de Identificación

CREATE TABLE "seguridad".tipo_identificacion (
	id integer DEFAULT 0 NOT NULL,
	nombre varchar(40) DEFAULT '' NOT NULL,
	CONSTRAINT tipoIdentificacion_pk PRIMARY KEY (id)
);

-- Column comments

COMMENT ON TABLE seguridad."tipo_identificacion" IS 'Almacena los tipos de identificacion del usuario';
COMMENT ON COLUMN "seguridad".tipo_identificacion.id IS 'Identificador de tipo de identificación';
COMMENT ON COLUMN "seguridad".tipo_identificacion.nombre IS 'Nombre del tipo de identificación';


--Rol

CREATE TABLE seguridad.rol (
	id integer DEFAULT 0 NOT NULL,
	nombre varchar(100) DEFAULT '' NOT NULL,
	CONSTRAINT rol_pk PRIMARY KEY (id)
);

-- Column comments

COMMENT ON TABLE seguridad."rol" IS 'Almacena los roles de los usuarios';
COMMENT ON COLUMN seguridad.rol.id IS 'Identificador del tipo de rol';
COMMENT ON COLUMN seguridad.rol.nombre IS 'Nombre del rol';


--Usuario

CREATE TABLE seguridad.usuario (
	id integer DEFAULT 0 NOT NULL,
	tipo_identificacion_id integer DEFAULT 0 NOT NULL,
	rol_id integer DEFAULT 0 NOT NULL,
	identificacion varchar(20) DEFAULT '' NOT NULL,
	nombre varchar(100) DEFAULT '' NOT NULL,
	apellido varchar(100) DEFAULT '' NOT NULL,
	correo varchar(250) DEFAULT '' NOT NULL,
	"password" varchar(250) DEFAULT '' NOT NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (id),
	CONSTRAINT usuario_tipo_identificacion_fk FOREIGN KEY (tipo_identificacion_id) REFERENCES seguridad.tipo_identificacion(id),
	CONSTRAINT usuario_rol_fk FOREIGN KEY (rol_id) REFERENCES seguridad.rol(id)
);

-- Column comments

COMMENT ON TABLE seguridad."usuario" IS 'Almacena la información de los usuarios';
COMMENT ON COLUMN seguridad.usuario.id IS 'identificador de usuario';
COMMENT ON COLUMN seguridad.usuario.tipo_identificacion_id IS 'Identificador del tipo de identificacion';
COMMENT ON COLUMN seguridad.usuario.rol_id IS 'identificador del rol';
COMMENT ON COLUMN seguridad.usuario.identificacion IS 'identificacion de usuario';
COMMENT ON COLUMN seguridad.usuario.nombre IS 'Nombre de usuario';
COMMENT ON COLUMN seguridad.usuario.apellido IS 'Apellido usuario';
COMMENT ON COLUMN seguridad.usuario.correo IS 'Correo usuario';
COMMENT ON COLUMN seguridad.usuario."password" IS 'Contraseña usuario';

--Tipo_de_vehículo


CREATE TABLE transporte."tipo_vehiculo" (
	id integer DEFAULT 0 NOT NULL,
	tipo varchar(100) DEFAULT '' NOT NULL,
	cantidad_de_ejes integer DEFAULT 0 NOT NULL,
	CONSTRAINT tipo_de_vehiculo_pk PRIMARY KEY (id)
);
COMMENT ON TABLE transporte."tipo_vehiculo" IS 'Almacena los tipos de vehículos';

-- Column comments

COMMENT ON COLUMN transporte."tipo_vehiculo".id IS 'identificador del tipo del vehículo';
COMMENT ON COLUMN transporte."tipo_vehiculo".tipo IS 'tipo del vehículo ejemplo sedan, camioneta, carga, turismo';
COMMENT ON COLUMN transporte."tipo_vehiculo".cantidad_de_ejes IS 'define la cantidad de ejes del vehículo';


--Conductor


CREATE TABLE transporte.conductor (
	id integer DEFAULT 0 NOT NULL,
	usuario_id integer DEFAULT 0 NOT NULL,
	numero_licencia varchar(200) DEFAULT '' NOT NULL,
	CONSTRAINT conductor_pk PRIMARY KEY (id),
	CONSTRAINT conductor_usuario_fk FOREIGN KEY (usuario_id) REFERENCES seguridad.usuario(id)
);
COMMENT ON TABLE transporte.conductor IS 'Almacena la información de los conductores';

-- Column comments

COMMENT ON COLUMN transporte.conductor.id IS 'Identificador del conductor';
COMMENT ON COLUMN transporte.conductor.usuario_id IS 'identificador del usuario';
COMMENT ON COLUMN transporte.conductor.numero_licencia IS 'numero de licencia del conductor';


--Vehículo


CREATE TABLE transporte.vehiculo (
	id integer DEFAULT 0 NOT NULL,
	conductor_id integer DEFAULT 0 NOT NULL,
	tipo_vehículo_id integer DEFAULT 0 NOT NULL,
	placa varchar(20) DEFAULT '' NOT NULL,
	color varchar(20) DEFAULT '' NOT NULL,
	modelo varchar(20) DEFAULT '' NOT NULL,
	asientos integer DEFAULT 0 NOT NULL,
	esta_disponible boolean DEFAULT false NOT NULL,
	CONSTRAINT vehiculo_pk PRIMARY KEY (id),
	CONSTRAINT vehiculo_conductor_fk FOREIGN KEY (conductor_id) REFERENCES transporte.conductor(id),
	CONSTRAINT vehiculo_tipo_vehículo_fk FOREIGN KEY (tipo_vehículo_id) REFERENCES transporte.tipo_vehiculo(id)
);
COMMENT ON TABLE transporte.vehiculo IS 'Almacena la información de los vehículos';

-- Column comments

COMMENT ON COLUMN transporte.vehiculo.id IS 'identificador del tipo de vehículo';
COMMENT ON COLUMN transporte.vehiculo.conductor_id IS 'Identificación del conductor';
COMMENT ON COLUMN transporte.vehiculo.tipo_vehículo_id IS 'identificador del tipo del vehículo';
COMMENT ON COLUMN transporte.vehiculo.placa IS 'placa registrada del vehículo';
COMMENT ON COLUMN transporte.vehiculo.color IS 'Color del vehículo';
COMMENT ON COLUMN transporte.vehiculo.modelo IS 'modelo del vehículo';
COMMENT ON COLUMN transporte.vehiculo.asientos IS 'Cantidad de asientos del vehiculo';
COMMENT ON COLUMN transporte.vehiculo.esta_disponible IS 'disponible (1), no disponible (0)';


-- Solicitante

CREATE TABLE transporte.solicitante (
	id integer DEFAULT 0 NOT NULL,
	usuario_id integer DEFAULT 0 NULL,
	latitud_defecto integer DEFAULT 0 NOT NULL,
	longitud_defecto integer DEFAULT 0 NOT NULL,
	CONSTRAINT solicitante_pk PRIMARY KEY (id),
	CONSTRAINT solicitante_usuario_fk FOREIGN KEY (usuario_id) REFERENCES seguridad.usuario(id)
);
COMMENT ON TABLE transporte.solicitante IS 'Almacena la información de los usuarios que solicitan servicio de transporte';

-- Column comments

COMMENT ON COLUMN transporte.solicitante.id IS 'Identificador del solicitante';
COMMENT ON COLUMN transporte.solicitante.usuario_id IS 'Identificador del usuario';
COMMENT ON COLUMN transporte.solicitante.latitud_defecto IS 'Define la coordenada geográfica (latitud) defecto del usuario';
COMMENT ON COLUMN transporte.solicitante.longitud_defecto IS 'Define coordenada geográfica (longitud) defecto del usuario';


--Viaje

CREATE TABLE transporte.viaje (
	id integer DEFAULT 0 NOT NULL,
	solicitante_id integer DEFAULT 0 NOT NULL,
	vehiculo_id integer DEFAULT 0 NOT NULL,
	partida_latitud integer DEFAULT 0 NOT NULL,
	partida_longitud integer DEFAULT 0 NOT NULL,
	destino_latitud integer DEFAULT 0 NOT NULL,
	destino_longitud integer DEFAULT 0 NOT NULL,
	calificacion integer DEFAULT 0 NOT NULL,
	observaciones varchar(1000) DEFAULT '' NOT NULL,
	CONSTRAINT viaje_pk PRIMARY KEY (id),
	CONSTRAINT viaje_solicitante_fk FOREIGN KEY (solicitante_id) REFERENCES transporte.solicitante(id),
	CONSTRAINT viaje_vehiculo_fk FOREIGN KEY (vehiculo_id) REFERENCES transporte.vehiculo(id)
);
COMMENT ON TABLE transporte.viaje IS 'Almacena la información de los viajes que se tienen en el sistema';

-- Column comments

COMMENT ON COLUMN transporte.viaje.id IS 'Identificador del viaje';
COMMENT ON COLUMN transporte.viaje.solicitante_id IS 'Identificador del viaje';
COMMENT ON COLUMN transporte.viaje.vehiculo_id IS 'Identificador del vehículo';
COMMENT ON COLUMN transporte.viaje.partida_latitud IS 'Define la coordenada geográfica (latitud) de partida del viaje';
COMMENT ON COLUMN transporte.viaje.partida_longitud IS 'Define la coordenada geográfica (longitud) de la partida del viaje';
COMMENT ON COLUMN transporte.viaje.destino_latitud IS 'Define la coordenada geográfica (latitud) del destino del viaje';
COMMENT ON COLUMN transporte.viaje.destino_longitud IS 'Define la coordenada geográfica (longitud) del destino del viaje';
COMMENT ON COLUMN transporte.viaje.calificacion IS 'Define la calificación que le da el solicitante al viaje';
COMMENT ON COLUMN transporte.viaje.observaciones IS 'Especifica las observaciones que el usuario tiene del viaje';


--Medio de Pago

CREATE TABLE pago.medio_pago (
	id integer DEFAULT 0 NOT NULL,
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
  id integer DEFAULT 0 NOT NULL,
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
  id integer DEFAULT 0 NOT NULL,
  viaje_id integer DEFAULT 0 NOT NULL,
  medio_pago_id integer DEFAULT 0 NOT NULL,
  promocion_id integer DEFAULT 0 NOT NULL,
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
  id integer DEFAULT 0 NOT NULL,
  usuario_id integer DEFAULT 0 NOT NULL,
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


--Agente

CREATE TABLE soporte.agente (
id integer DEFAULT 0 NOT NULL,
usuario_id integer DEFAULT 0 NOT NULL,
alias varchar(100) DEFAULT '' NOT NULL,
CONSTRAINT agente_pk PRIMARY KEY (id),
CONSTRAINT agente_usuario_fk FOREIGN KEY (usuario_id) REFERENCES
seguridad.usuario(id)
);
COMMENT ON TABLE soporte.agente IS 'Almacena los agente que brindan soporte';
-- Column comments
COMMENT ON COLUMN soporte.agente.id IS 'Identificador del agente';
COMMENT ON COLUMN soporte.agente.usuario_id IS 'Identificador del usuario';
COMMENT ON COLUMN soporte.agente.alias IS 'Define el nombre que se le presenta a quien recibe soporte por parte del agente';


--pqrs

CREATE TABLE soporte.pqrs (
id integer DEFAULT 0 NOT NULL,
agente_id integer DEFAULT 0 NOT NULL,
tipo varchar(1) DEFAULT '' NOT NULL,
estado varchar(60) DEFAULT '' NOT NULL,
observaciones varchar(1000) NOT NULL,
CONSTRAINT pqrs_pk PRIMARY KEY (id),
CONSTRAINT pqrs_pqrs_fk FOREIGN KEY (agente_id) REFERENCES
soporte.pqrs(id)
);
COMMENT ON TABLE soporte.pqrs IS 'Almacena las peticiones, quejas, reclamos y sugerencia';

-- Column comments

COMMENT ON COLUMN soporte.pqrs.id IS 'identificador de la pqrs';
COMMENT ON COLUMN soporte.pqrs.agente_id IS 'Identificador del agente que interactúa con la pqrs';
COMMENT ON COLUMN soporte.pqrs.tipo IS 'Petición (p), Queja (q), Reclamo (r), Sugerencia (s)';
COMMENT ON COLUMN soporte.pqrs.estado IS 'Define el nombre estado de la pqrs';
COMMENT ON COLUMN soporte.pqrs.observaciones IS 'Define la descripción y acciones de la pqrs';

INSERT INTO seguridad.tipo_identificacion VALUES (0, 'No definido');
INSERT INTO seguridad.tipo_identificacion VALUES (10, 'Cédula de ciudadanía');
INSERT INTO seguridad.rol VALUES (0, 'No definido');
INSERT INTO seguridad.rol VALUES (10, 'Administrador');
INSERT INTO seguridad.rol VALUES (20, 'Solicitante');
INSERT INTO seguridad.rol VALUES (30, 'Conductor');
INSERT INTO seguridad.rol VALUES (40, 'Agente');
INSERT INTO seguridad.usuario VALUES (0, 0, 0, 'No definido', 'No definido', 'No definido', 'No definido', 'No definido');
INSERT INTO seguridad.usuario VALUES (10, 10, 10, 'Ident Admin', 'Nombre Admin', 'Apellido Admin', 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO transporte.tipo_vehiculo VALUES (0, 'No definido', 0);
INSERT INTO transporte.tipo_vehiculo VALUES (10, 'Automóvil', 2);
INSERT INTO transporte.tipo_vehiculo VALUES (20, 'Campero', 2);
INSERT INTO transporte.tipo_vehiculo VALUES (30, 'Camioneta', 2);
INSERT INTO transporte.tipo_vehiculo VALUES (40, 'Microbus', 3);
INSERT INTO transporte.conductor VALUES (0, 0, 'No definido');
INSERT INTO transporte.vehiculo VALUES (0, 0, 0, 'No definido', 'No definido', 'No definido', 0, false);
INSERT INTO transporte.solicitante VALUES (0, 0, 0, 0);
INSERT INTO transporte.viaje VALUES (0, 0, 0, 0, 0, 0, 0, 0, 'No definido');
INSERT INTO pago.medio_pago VALUES (0, 'No definido', 'No definido');
INSERT INTO pago.medio_pago VALUES (10, 'Tarjeta de crédito', 'Visa');
INSERT INTO pago.medio_pago VALUES (20, 'Tarjeta de crédito', 'MasterCard');
INSERT INTO pago.medio_pago VALUES (30, 'Efectivo', 'Efectivo');
INSERT INTO pago.promocion VALUES (0, 0, 'Efectivo', false);
INSERT INTO pago.pago VALUES (0, 0, 0, 0, 0, 0, 0);
INSERT INTO pago.referido VALUES (0, 0, 'No definido', 'No definido');
INSERT INTO soporte.agente VALUES (0, 0, 'No definido');
INSERT INTO soporte.pqrs VALUES (0, 0, 'N', 'No definido', 'No definido');
