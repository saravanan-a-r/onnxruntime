// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { LoraAdapterHandler, TRACE_FUNC_BEGIN, TRACE_FUNC_END } from 'onnxruntime-common';

import { createLoraAdapter, releaseLoraAdapter } from './proxy-wrapper';
import { loadFile } from './wasm-utils-load-file';

export class OnnxruntimeWebAssemblyLoraAdapterHandler implements LoraAdapterHandler {
  adapterId: number;

  async loadAdapter(pathOrBuffer: string | Uint8Array): Promise<void> {
    TRACE_FUNC_BEGIN();
    const adapterData = typeof pathOrBuffer === 'string' ? await loadFile(pathOrBuffer) : pathOrBuffer;
    this.adapterId = await createLoraAdapter(adapterData);
    TRACE_FUNC_END();
  }

  async dispose(): Promise<void> {
    return releaseLoraAdapter(this.adapterId);
  }
}
