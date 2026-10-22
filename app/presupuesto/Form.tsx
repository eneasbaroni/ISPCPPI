"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSubmit } from "@/lib/actions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { formSchema, FormValues } from "./FormSchema";
import { SOPORTES } from "./constants";
import FormLoader from "../_components/FormLoader/FormLoader";

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <span className="error-msg">{msg}</span> : null;

// ─── Componente principal ─────────────────────────────────────────────────────

const Form = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",  
    reValidateMode: "onChange",
  });

  // ── Manejo del archivo ────────────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.size > 4_000_000) {
      setFileError("El archivo es demasiado grande (máx. 4 MB)");
      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
    Swal.fire({
      icon: "success",
      title: "Archivo cargado",
      text: `"${selectedFile.name}" cargado exitosamente`,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const onSubmit = async (
    _values: FormValues,
    e?: React.BaseSyntheticEvent
  ) => {
    if (!file) {
      setFileError("Debés adjuntar una imagen de referencia antes de enviar");
      return;
    }

    setLoading(true);
    const data = new FormData(e?.target as HTMLFormElement);

    try {
      const res = await handleSubmit(data);
      if (res === "ok") {
        Swal.fire({
          icon: "success",
          html: "Gracias por tu consulta<BR/>Te estará llegando un correo con el presupuesto",

          confirmButtonText: "VOLVER AL INICIO",
        });
        setTimeout(() => router.push("/"), 500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al enviar el formulario, por favor intentá nuevamente",
        });
      }
    } catch (error) {
      console.error("Error al enviar", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al enviar el formulario",
      });
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {loading && <FormLoader />}
      

      <form className="formulario" onSubmit={rhfHandleSubmit(onSubmit)} noValidate>

        {/* Nombre */}
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          placeholder="NOMBRE"
          className="userInput"
          type="text"
          {...register("nombre")}
        />
        <ErrorMsg msg={errors.nombre?.message} />

        {/* Apellido */}
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          placeholder="APELLIDO"
          className="userInput"
          type="text"
          {...register("apellido")}
        />
        <ErrorMsg msg={errors.apellido?.message} />

        {/* Teléfono */}
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          placeholder="TELEFONO (sin guiones, sin 0 y sin 15)"
          className="userInput"
          type="text"
          {...register("telefono")}
        />
        <ErrorMsg msg={errors.telefono?.message} />

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="E-MAIL"
          className="userInput"
          type="email"
          {...register("email")}
        />
        <ErrorMsg msg={errors.email?.message} />

        {/* Soporte */}
        <label htmlFor="soporte">Soporte de Trabajo</label>
        <select
          className="form-control"
          id="soporte"
          {...register("soporte")}
        >
          {SOPORTES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <ErrorMsg msg={errors.soporte?.message} />

        {/* Medida */}
        <label htmlFor="medida">Medida del Trabajo</label>
        <input
          id="medida"
          placeholder="MEDIDA DEL TRABAJO EN cm (ej: 20x30)"
          className="userInput"
          type="text"
          {...register("medida")}
        />
        <ErrorMsg msg={errors.medida?.message} />

        {/* Cantidad de colores */}
        <label htmlFor="cantidadColores">Cantidad de Colores</label>
        <input
          id="cantidadColores"
          placeholder="CANTIDAD DE COLORES EN ESTAMPA (máximo 5)"
          className="userInput"
          type="text"
          {...register("cantidadColores")}
        />
        <ErrorMsg msg={errors.cantidadColores?.message} />

        {/* Cantidad de copias */}
        <label htmlFor="cantidad">Cantidad de Copias</label>
        <input
          id="cantidad"
          placeholder="CANTIDAD DE COPIAS A REALIZAR"
          className="userInput"
          type="text"
          {...register("cantidad")}
        />
        <ErrorMsg msg={errors.cantidad?.message} />

        {/* Descripción */}
        <label htmlFor="descripcion">Breve Descripción</label>
        <input
          id="descripcion"
          placeholder="DESCRIPCION DEL TRABAJO A REALIZAR"
          className="userInput"
          type="text"
          {...register("descripcion")}
        />
        <ErrorMsg msg={errors.descripcion?.message} />

        {/* Archivo */}
        <label className="fileSelectorLabel" htmlFor="file">
          {file
            ? `Imagen de referencia: ${file.name}`
            : "ADJUNTE UNA IMAGEN DE REFERENCIA - MAX 4MB"}
        </label>
        <input
          className="fileSelector"
          type="file"
          name="file"
          id="file"
          onChange={handleFileChange}
        />
        <ErrorMsg msg={fileError} />

        <button className="col-2 enviarBtn" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
};

export default Form;