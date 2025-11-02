// src/components/contact/ContactForm.tsx
import { useState } from "react";
import { Form, Button, Alert, FloatingLabel } from "react-bootstrap";

// ✅ Tipos para los datos del formulario
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ✅ Tipos para los errores (cada campo puede tener un string o nada)
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  // 1. Estado para los valores del formulario
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // 2. Estado para errores
  const [errors, setErrors] = useState<FormErrors>({});

  // 3. Estado para el mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ Validación de campos
  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (value.length < 3)
          error = "El nombre debe tener al menos 3 caracteres.";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value))
          error = "El formato del email no es válido.";
        break;
      case "subject":
        if (!value) error = "El asunto es requerido.";
        break;
      case "message":
        if (value.length < 10)
          error = "El mensaje debe tener al menos 10 caracteres.";
        break;
      default:
        break;
    }
    return error;
  };

  // ✅ Tipado del evento de input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validar en tiempo real
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  // ✅ Tipado para onBlur
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ✅ Tipado del evento del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const field = key as keyof FormData;
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Formulario enviado:", formData);
      setShowSuccess(true);

      // Reset del formulario
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset errores
      setErrors({});

      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {/* ✅ Mensaje de éxito */}
      {showSuccess && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowSuccess(false)}
        >
          ¡Mensaje enviado con éxito! Te responderemos pronto.
        </Alert>
      )}

      {/* Nombre */}
      <Form.Group className="mb-3" controlId="formName">
        <FloatingLabel label="Nombre Completo">
          <Form.Control
            type="text"
            name="name"
            placeholder="Nombre Completo"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      {/* Email */}
      <Form.Group className="mb-3" controlId="formEmail">
        <FloatingLabel label="Correo Electrónico">
          <Form.Control
            type="email"
            name="email"
            placeholder="tu@correo.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      {/* Asunto */}
      <Form.Group className="mb-3" controlId="formSubject">
        <FloatingLabel label="Asunto">
          <Form.Control
            type="text"
            name="subject"
            placeholder="Asunto"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.subject}
          />
          <Form.Control.Feedback type="invalid">
            {errors.subject}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      {/* Mensaje */}
      <Form.Group className="mb-3" controlId="formMessage">
        <FloatingLabel label="Mensaje">
          <Form.Control
            as="textarea"
            name="message"
            value={formData.message}
            placeholder="Escribe tu mensaje aquí..."
            style={{ height: "150px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.message}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Button variant="primary" type="submit" size="lg">
        Enviar Mensaje
      </Button>
    </Form>
  );
};

export default ContactForm;
