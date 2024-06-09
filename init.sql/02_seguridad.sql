-- Tipo de Identificación

CREATE TABLE "seguridad".tipo_identificacion (
	id numeric DEFAULT 0 NOT NULL,
	nombre varchar(40) DEFAULT '' NOT NULL,
	CONSTRAINT tipoIdentificacion_pk PRIMARY KEY (id)
);

-- Column comments

COMMENT ON TABLE seguridad."tipo_identificacion" IS 'Almacena los tipos de identificacion del usuario';
COMMENT ON COLUMN "seguridad".tipo_identificacion.id IS 'Identificador de tipo de identificación';
COMMENT ON COLUMN "seguridad".tipo_identificacion.nombre IS 'Nombre del tipo de identificación';


--Rol

CREATE TABLE seguridad.rol (
	id numeric DEFAULT 0 NOT NULL,
	nombre varchar(100) DEFAULT '' NOT NULL,
	CONSTRAINT rol_pk PRIMARY KEY (id)
);

-- Column comments

COMMENT ON TABLE seguridad."rol" IS 'Almacena los roles de los usuarios';
COMMENT ON COLUMN seguridad.rol.id IS 'Identificador del tipo de rol';
COMMENT ON COLUMN seguridad.rol.nombre IS 'Nombre del rol';


--Usuario

CREATE TABLE seguridad.usuario (
	id numeric DEFAULT 0 NOT NULL,
	tipo_identificacion_id numeric DEFAULT 0 NOT NULL,
	rol_id numeric DEFAULT 0 NOT NULL,
	identificación varchar(20) DEFAULT '' NOT NULL,
	nombre varchar(100) DEFAULT '' NOT NULL,
	apellido varchar(100) DEFAULT '' NOT NULL,
	correo varchar(250) DEFAULT '' NOT NULL,
	"password" varchar(250) DEFAULT '' NOT NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (id),
	CONSTRAINT usuario_tipo_identificacion_fk FOREIGN KEY (tipo_identificacion_id) REFERENCES seguridad.tipo_identificacion(id),
	CONSTRAINT usuario_rol_fk FOREIGN KEY (rol_id) REFERENCES seguridad.rol(id)
);

-- Column comments

COMMENT ON TABLE usuario."usuario" IS 'Almacena la información de los usuarios';
COMMENT ON COLUMN seguridad.usuario.id IS 'identificador de usuario';
COMMENT ON COLUMN seguridad.usuario.tipo_identificacion_id IS 'Identificador del tipo de identificacion';
COMMENT ON COLUMN seguridad.usuario.rol_id IS 'identificador del rol';
COMMENT ON COLUMN seguridad.usuario.identificador IS 'identificacion de usuario';
COMMENT ON COLUMN seguridad.usuario.nombre IS 'Nombre de usuario';
COMMENT ON COLUMN seguridad.usuario.apellido IS 'Apellido usuario';
COMMENT ON COLUMN seguridad.usuario.correo IS 'Correo usuario';
COMMENT ON COLUMN seguridad.usuario."password" IS 'Contraseña usuario';

