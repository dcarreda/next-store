import { useRouter } from "next/router"

function Name() {
    const router = useRouter();
    const { name } = router.query;
    return (
        <div>
            <p>This will be dinamic {name}</p>
        </div>
    )
}

export default Name
