const sucess = (message: string, result: any, statusCode: number) => {
  return {
    message: message,
    result: result,
    code: statusCode,
  };
};

const error = (err: any, code: number) => {
  if (!code) {
    code = err.code ?? 500;
  }

  const message =
    err ?? "There is issue in backend . Please Contact Backend Developer";
  return {
    message,
    code,
  };
};

const validation = (errors: any) => {
  let error: string[] = [];
  errors.issues.map((elem: { message: string }) => {
    error.push(elem.message);
  });
  return {
    message: "Validation error",
    code: 422,
    errors: error,
  };
};

export { sucess, error, validation };
