--Tipo_de_vehículo


CREATE TABLE transporte."tipo_vehículo" (
	id numeric DEFAULT 0 NOT NULL,
	tipo varchar(100) DEFAULT '' NOT NULL,
	cantidad_de_ejes numeric DEFAULT 0 NOT NULL,
	CONSTRAINT tipo_de_vehiculo_pk PRIMARY KEY (id)
);
COMMENT ON TABLE transporte."tipo_vehículo" IS 'Almacena los tipos de vehículos';

-- Column comments

COMMENT ON COLUMN transporte."tipo_vehículo".id IS 'identificador del tipo del vehículo';
COMMENT ON COLUMN transporte."tipo_vehículo".tipo IS 'tipo del vehículo ejemplo sedan, camioneta, carga, turismo';
COMMENT ON COLUMN transporte."tipo_vehículo".cantidad_de_ejes IS 'define la cantidad de ejes del vehículo';


--Conductor


CREATE TABLE transporte.conductor (
	id numeric DEFAULT 0 NOT NULL,
	usuario_id numeric DEFAULT 0 NOT NULL,
	numero_licencia varchar(20) DEFAULT '0' NOT NULL,
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
	CONSTRAINT vehiculo_tipo_vehículo_fk FOREIGN KEY (tipo_vehículo_id) REFERENCES transporte.tipo_vehículo(id)
);
COMMENT ON TABLE transporte.vehiculo IS 'Tipo de vehículo que puede solicitar el usuario';

-- Column comments

COMMENT ON COLUMN transporte.vehiculo.id IS 'identificador del tipo de vehículo';
COMMENT ON COLUMN transporte.vehiculo.conductor_id IS 'Identificación del conductor';
COMMENT ON COLUMN transporte.vehiculo.tipo_vehículo_id IS 'identificador del tipo del vehículo';
COMMENT ON COLUMN transporte.vehiculo.placa IS 'placa registrada del vehículo';
COMMENT ON COLUMN transporte.vehiculo.color IS 'Color del vehículo';
COMMENT ON COLUMN transporte.vehiculo.modelo IS 'modelo del vehículo';
COMMENT ON COLUMN transporte.vehiculo.asientos IS 'Número de sillas que dispone el vehiculo';
COMMENT ON COLUMN transporte.vehiculo.esta_disponible IS 'disponible  (1), no disponible (0)';

