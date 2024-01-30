const { default: PageTermsComponent } = require("@components/PageTermsComponent")

export const metadata = {
  title: "EncuéntraLo Fácil CR: Términos y condiciones",
  description: "EncuéntraLo Fácil CR, encuentra en esta página nuestras condiciones para el uso y disfrute de la plataforma.",
};

const TermsAndConditions = () => {
  return (
    <PageTermsComponent/>    
  );
};

export default TermsAndConditions;
