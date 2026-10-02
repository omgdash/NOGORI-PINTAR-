import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { NogoriLogo } from './NogoriLogo';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF9F3] text-[#171717] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-stone-200 shadow-xl flex flex-col items-center">
            <NogoriLogo size="md" />

            <div className="mt-6 mb-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#46B7B0] block mb-1">
                Sistem Papan Pemuka
              </span>
              <h1 className="text-lg font-black text-stone-900 leading-snug uppercase">
                Pelan Induk Bandar Pintar Negeri Sembilan 2040
              </h1>
            </div>

            <div className="p-3 bg-red-50 text-red-700 rounded-2xl border border-red-200/80 mb-6 flex items-center gap-2.5 text-xs text-left w-full">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
              <div>
                <strong className="block font-bold">Maaf, aplikasi tidak dapat dimuatkan.</strong>
                <span className="text-[11px] text-red-600/90">
                  {this.state.error?.message || 'Sila muat semula halaman ini.'}
                </span>
              </div>
            </div>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs tracking-wide shadow-md transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Cuba Semula</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
