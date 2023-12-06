import MainLayout from "../components/layouts/MainLayout";
import PrivacyPolicyForm from "../components/layouts/footer/PrivacyPolicyForm";

const PrivacyPage = () => {
  return(
      <>
          <MainLayout>
              <div>
                  <PrivacyPolicyForm/>
              </div>
          </MainLayout>
      </>
  )
}

export default PrivacyPage