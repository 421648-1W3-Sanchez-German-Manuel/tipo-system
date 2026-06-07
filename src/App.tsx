import { FormProvider } from './context/FormContext';
import Wizard from './components/Wizard';

export default function App() {
  return (
    <FormProvider>
      <Wizard />
    </FormProvider>
  );
}
