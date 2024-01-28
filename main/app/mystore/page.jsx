
const { default: PageMyStoreComponent } = require("@components/PageMyStoreComponent")

export const metadata = {
  title: "EncuéntraLo Fácil CR: Mi tienda",
  description: "Encuentralo Fácil CR, publica tus  productos, bienes, casas, autos u otros con nosotros. Descrubre la magia de encuéntralo fácil CR!",
};

const CustomerStore = () => {
  return (
    <PageMyStoreComponent/>
  );
};

export default CustomerStore;
