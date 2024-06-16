-- Agente

CREATE TABLE soporte.agente (
	id integer DEFAULT 0 NOT NULL,
	usuario_id integer DEFAULT 0 NOT NULL,
	alias varchar(100) DEFAULT '' NOT NULL,
	CONSTRAINT agente_pk PRIMARY KEY (id),
	CONSTRAINT agente_usuario_fk FOREIGN KEY (usuario_id) REFERENCES seguridad.usuario(id)
);
COMMENT ON TABLE soporte.agente IS 'Almacena los agente que brindan soporte';

-- Column comments

COMMENT ON COLUMN soporte.agente.id IS 'Identificador del agente';
COMMENT ON COLUMN soporte.agente.usuario_id IS 'Identificador del usuario';
COMMENT ON COLUMN soporte.agente.alias IS 'Define el nombre que se le presenta a quien recibe soporte por parte del agente';

-- pqrs

CREATE TABLE soporte.pqrs (
	id integer DEFAULT 0 NOT NULL,
	agente_id integer DEFAULT 0 NOT NULL,
	tipo varchar(1) DEFAULT '' NOT NULL,
	estado varchar(60) DEFAULT '' NOT NULL,
	observaciones varchar(1000) NOT NULL,
	CONSTRAINT pqrs_pk PRIMARY KEY (id),
	CONSTRAINT pqrs_pqrs_fk FOREIGN KEY (agente_id) REFERENCES soporte.pqrs(id)
);
COMMENT ON TABLE soporte.pqrs IS 'Almacena las peticiones, quejas, reclamos y sugerencia';

-- Column comments

COMMENT ON COLUMN soporte.pqrs.id IS 'identificador de la pqrs';
COMMENT ON COLUMN soporte.pqrs.agente_id IS 'Identificador del agente que interactúa con la pqrs';
COMMENT ON COLUMN soporte.pqrs.tipo IS 'Petición (p), Queja (q), Reclamo (r), Sugerencia (s)';
COMMENT ON COLUMN soporte.pqrs.estado IS 'Define el nombre estado de la pqrs';
COMMENT ON COLUMN soporte.pqrs.observaciones IS 'Define la descripción y acciones de la pqrs';
