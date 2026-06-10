// This is a demo of a preview
// That's what users will see in the preview

import { AuthUI } from "@/components/ui/auth-ui";

const DemoOne = () => {
  return <AuthUI />;
};

// IMPORTANT:
// format of the export MUST be export default { DemoOneOrOtherName }
// if you don't do this, the demo will not be shown
export default { DemoOne };
