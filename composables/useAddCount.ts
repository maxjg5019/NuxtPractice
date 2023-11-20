export const useAddCount = () => {
    const count = ref(15);
    return{count};
}

export function useAddCount2() {
    const count2 = ref(150);
    return{count2};
}
