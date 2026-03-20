function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateCreateUser(body) {
  const { nombre, email, password } = body;

  if (!nombre || !email || !password) {
    return 'nombre, email y password son obligatorios';
  }

  if (!isValidEmail(email)) {
    return 'El formato del email no es valido';
  }

  return null;
}

function validateUpdateUser(body) {
  const allowedFields = ['nombre', 'email', 'password'];
  const keys = Object.keys(body || {});

  if (keys.length === 0) {
    return { error: 'Debes enviar al menos un campo para actualizar', validData: null };
  }

  const invalidField = keys.find((key) => !allowedFields.includes(key));
  if (invalidField) {
    return { error: `Campo no permitido para actualizacion: ${invalidField}`, validData: null };
  }

  if (body.email && !isValidEmail(body.email)) {
    return { error: 'El formato del email no es valido', validData: null };
  }

  const validData = {};
  allowedFields.forEach((field) => {
    if (body[field] !== undefined) {
      validData[field] = body[field];
    }
  });

  return { error: null, validData };
}

module.exports = {
  validateCreateUser,
  validateUpdateUser
};
