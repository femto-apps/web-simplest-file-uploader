import useStickyState from "./useStickyState";

export default function useSettings() {
    const [config, setConfig] = useStickyState('config', {
        shortLength: 4,
        password: '',
    })

    return [config, setConfig]
}