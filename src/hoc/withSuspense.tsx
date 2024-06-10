import { ComponentType, Suspense } from "react";
import { Preloader } from "../components/common/preloader/Preloader";

export function withSuspense<T>(ComponentForRedirect: ComponentType<T>) {
  return () => {
    return <Suspense fallback={<Preloader />}>ComponentForRedirect</Suspense>;
  };
}
