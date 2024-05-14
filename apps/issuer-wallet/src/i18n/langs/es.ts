import { Dictionary } from "../types/dictionary";

export const esDictionary: Dictionary = {
  schemas: "Esquemas",
  schemasCTA: "Crea, edita y gestiona tus esquemas aquí",
  addSchema: "Añadir esquema",
  createSchema: "Crear esquema",
  errorScreen: {
    title: "¡Vaya! Algo salió mal",
    subtitle:
      "Estamos arreglandolo, mientras tanto puedes intentar lo siguiente:",
    options: {
      refresh: "Refrescar (Sí, a veces funciona)",
      tryAgain: "Volver a intentarlo en 10 minutos",
      sendEmail: "Enviar email a soporte explicando que ha pasado",
    },
  },
  paginator: {
    goToLast: "Ir a la última página",
    goToFirst: "Ir a la primera página",
    goToNext: "Ir a la siguiente página",
    goToPrevious: "Ir a la página anterior",
    page: "Página",
    of: "de",
    rowsPerPage: "Filas por página",
  },
  schemaForm: {
    name: {
      label: "Nombre",
      placeholder: "Pasaporte",
    },
    types: {
      label: "Tipos",
      placeholder: "Propiedad, identidad, etc.",
      hint: "Dale a enter para añadir un tipo. Haz click en una etiqueta para eliminarla.",
    },
    data: {
      label: "Datos",
      placeholder: "Nombre, fecha de nacimiento, etc.",
    },
    property: {
      label: "Nombre",
      placeholder: "Fecha de nacimiento",
    },
    lang: {
      label: "Idioma",
      placeholder: "Español",
      values: {
        en: "Inglés",
        es: "Español",
      },
    },
    type: {
      label: "Tipo",
      placeholder: "Cadena de texto",
      values: {
        string: "Cadena de texto",
        number: "Número",
        boolean: "Verdadero/Falso",
        object: "Datos",
        list: "Lista",
        date: "Fecha",
        did: "DID",
      },
    },
    subtype: {
      label: "Subtipo",
      placeholder: "Texto",
      values: {
        string: "Texto",
        number: "Número",
        boolean: "Booleano",
        object: "Objeto",
        list: "Lista",
        date: "Fecha",
        did: "DID",
      },
    },
    discard: "Descartar",
    save: "Guardar esquema",
    addProperty: "Añadir propiedad",
  },
  schemaTable: {
    name: "Nombre",
    types: "Tipos",
    status: "Estado",
    lang: "Idioma",
    actions: "",
  },
  schemaStatus: {
    public: "Público",
    private: "Privado",
  },
  delete: "Eliminar",
  edit: "Editar",
};
