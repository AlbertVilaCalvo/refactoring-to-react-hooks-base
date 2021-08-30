import { renderHook } from "@testing-library/react-hooks";
import { useFetch } from "./useFetch";

it("sum numbers", () => {
  expect(1 + 2).toEqual(3);
});

const URL = "https://www.example.com";

it("useFetch initial state is: loading true, data null, error null", () => {
  // How to mock fetch with jest
  // https://www.valentinog.com/blog/fake/#mocking-fetch-with-jest
  // https://www.valentinog.com/blog/testing-react/
  jest.spyOn(window, "fetch").mockImplementation(() => {
    const fetchResponse = {
      ok: true,
      json: () => Promise.resolve("response")
    };
    return Promise.resolve(fetchResponse);
  });

  const { result } = renderHook(() => useFetch(URL));

  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBe(null);
  expect(result.current.error).toBe(null);
});

it("useFetch response 200 ok next state is: loading false, data 'response', error null", async () => {
  jest.spyOn(window, "fetch").mockImplementation(() => {
    const fetchResponse = {
      ok: true,
      json: () => Promise.resolve("response")
    };
    return Promise.resolve(fetchResponse);
  });

  const { result, waitForNextUpdate } = renderHook(() => useFetch(URL));

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBe("response");
  expect(result.current.error).toBe(null);
});

it("useFetch response not ok next state is: loading false, data null, error Error", async () => {
  jest.spyOn(window, "fetch").mockImplementation(() => {
    const fetchResponse = {
      ok: false,
      json: () => Promise.resolve("response"),
      statusText: "statusText error"
    };
    return Promise.resolve(fetchResponse);
  });

  const { result, waitForNextUpdate } = renderHook(() => useFetch(URL));

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBe(null);
  expect(result.current.error.message).toBe("statusText error");
});

// Solution
// ********

describe("useFetch hook", () => {
  it("should GET data", async () => {
    const expected = { salesTotal: 899, subscriptionsTotal: 344 };
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(expected)
      };
      return Promise.resolve(fetchResponse);
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("/api/totals/")
    );

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeFalsy();

    await waitForNextUpdate();
    expect(result.current.data).toMatchObject(expected);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();

    window.fetch.mockRestore();
  });

  it("should handle errors", async () => {
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: false,
        statusText: "500 Server error"
      };
      return Promise.resolve(fetchResponse);
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("/api/totals/")
    );

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeFalsy();

    await waitForNextUpdate();
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toEqual("500 Server error");

    window.fetch.mockRestore();
  });
});
