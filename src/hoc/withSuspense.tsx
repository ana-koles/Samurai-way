import { ComponentType, Suspense } from "react";
import { Preloader } from "../components/common/preloader/Preloader";

export function withSuspense<T extends JSX.IntrinsicAttributes>(ComponentForRedirect: ComponentType<T>) {
  return (props: T) => {
    return <Suspense fallback={<Preloader />}><ComponentForRedirect {...props}/></Suspense>;
  };
}
