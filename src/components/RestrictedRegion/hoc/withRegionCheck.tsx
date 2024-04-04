/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { getUserMetadata, isRegionIsRestricted } from '../utils'
import { RestrictedRegion } from '../RestrictedRegion'

export function withRegionCheck(Component: React.ComponentType<any>) {
  return function RegionCheckComponent(props: any) {
    const [isFromRestrictedRegion, setIsFromRestrictedRegion] =
      useState<boolean>(false)

    useEffect(() => {
      const getIsRegionRestricted = async () => {
        const userMetadata = await getUserMetadata()

        // if network is failed, make it the way that user is restricted
        if (!userMetadata) {
          setIsFromRestrictedRegion(true)

          return
        }

        const isRestrictedRegion = isRegionIsRestricted({ countryCode: userMetadata.loc })

        setIsFromRestrictedRegion(isRestrictedRegion)
      }
      getIsRegionRestricted()
    }, [setIsFromRestrictedRegion])

    if (isFromRestrictedRegion) {
      return <RestrictedRegion {...props} />
    }

    return <Component {...props} />
  }
}
