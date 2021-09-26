// ensures redirect is from same URL
export const isSameOriginRedirect = (urlString, base) => {
    const url = new URL(base);
    const redirect = new URL(urlString, base);

    return url.origin !== redirect.origin;
};

