import { ComponentType, Suspense } from "react";
import { Preloader } from "../components/common/Preloader";


export function withSuspense<T>(ComponentForRedirect: ComponentType<T>) {
  return () => {
    return <Suspense fallback={<Preloader />}>
              ComponentForRedirect
          </Suspense>
  }
}