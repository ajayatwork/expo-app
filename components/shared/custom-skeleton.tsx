import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";

export default function CustomSkeleton({children}){
    return(
        <SkeletonPlaceholder>
            {children}
        </SkeletonPlaceholder>
    )
}