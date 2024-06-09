--Tipo_de_vehículo


CREATE TABLE transporte."tipo_vehiculo" (
	id numeric DEFAULT 0 NOT NULL,
	tipo varchar(100) DEFAULT '' NOT NULL,
	cantidad_de_ejes numeric DEFAULT 0 NOT NULL,
	CONSTRAINT tipo_de_vehiculo_pk PRIMARY KEY (id)
);
COMMENT ON TABLE transporte."tipo_vehiculo" IS 'Almacena los tipos de vehículos';

-- Column comments

COMMENT ON COLUMN transporte."tipo_vehiculo".id IS 'identificador del tipo del vehículo';
COMMENT ON COLUMN transporte."tipo_vehiculo".tipo IS 'tipo del vehículo ejemplo sedan, camioneta, carga, turismo';
COMMENT ON COLUMN transporte."tipo_vehiculo".cantidad_de_ejes IS 'define la cantidad de ejes del vehículo';


--Conductor


CREATE TABLE transporte.conductor (
	id numeric DEFAULT 0 NOT NULL,
	usuario_id numeric DEFAULT 0 NOT NULL,
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
	id numeric DEFAULT 0 NOT NULL,
	conductor_id numeric DEFAULT 0 NOT NULL,
	tipo_vehículo_id numeric DEFAULT 0 NOT NULL,
	placa varchar(20) DEFAULT '' NOT NULL,
	color varchar(20) DEFAULT '' NOT NULL,
	modelo varchar(20) DEFAULT '' NOT NULL,
	asientos numeric DEFAULT 0 NOT NULL,
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
	id numeric DEFAULT 0 NOT NULL,
	usuario_id numeric DEFAULT 0 NULL,
	latitud_defecto numeric DEFAULT 0 NOT NULL,
	longitud_defecto numeric DEFAULT 0 NOT NULL,
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
	id numeric DEFAULT 0 NOT NULL,
	solicitante_id numeric DEFAULT 0 NOT NULL,
	vehiculo_id numeric DEFAULT 0 NOT NULL,
	partida_latitud numeric DEFAULT 0 NOT NULL,
	partida_longitud numeric DEFAULT 0 NOT NULL,
	destino_latitud numeric DEFAULT 0 NOT NULL,
	destino_longitud numeric DEFAULT 0 NOT NULL,
	calificacion numeric DEFAULT 0 NOT NULL,
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


