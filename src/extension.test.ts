import * as vscode from "vscode";
import * as extension from "./extension";

const mockedInformationMessage = jest.fn();

jest.mock("vscode", () => ({
  window: {
    showInformationMessage: () => Promise.resolve(),
  },
}));

describe("extension", () => {
  beforeEach(() => {
    jest
      .spyOn(extension, "getModifiedFilesAmount")
      .mockReturnValue(Promise.resolve("   20"));
    jest.spyOn(extension, "dispatchMessage");
  });

  it("should work properly", async () => {
    jest.useFakeTimers();
    extension.activate();
    await jest.advanceTimersByTime(1000 * 60 * 5);
    expect(extension.dispatchMessage).toHaveBeenCalled();
  });
});
