// The result panel is the app's one dark surface, so the share card is that same
// surface turned into an image: ink background, paper text, one signal-orange
// verdict only when the round was lost. No shadows, no gradients — the card is a
// flat poster that still looks like Grammax when it leaves the app.

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;
const PADDING = 96;
const FONT_FAMILY = '"Inter Tight", system-ui, sans-serif';

function readColors() {
  const styles = getComputedStyle(document.documentElement);
  const token = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
  return {
    ink: token('--color-inverse-surface', '#222222'),
    paper: token('--color-inverse-on-surface', '#FFFFFF'),
    muted: token('--color-on-surface-variant', '#A7A7A7'),
    signal: token('--color-signal', '#FA5D29'),
  };
}

function fontOf(weight, size) {
  return `${weight} ${size}px ${FONT_FAMILY}`;
}

// A four-digit score would run out of the card at the display size, so shrink it
// until it fits instead of letting fillText clip the last digit.
function fitScoreSize(ctx, text, maxWidth) {
  let size = 220;
  while (size > 96) {
    ctx.font = fontOf(600, size);
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 8;
  }
  return size;
}

export async function createShareImage(data) {
  if (document.fonts?.ready) await document.fonts.ready.catch(() => {});

  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D is not available');

  const colors = readColors();
  const won = data.outcome === 'won';
  const score = String(data.score);

  ctx.fillStyle = colors.ink;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = colors.paper;
  ctx.font = fontOf(700, 30);
  if ('letterSpacing' in ctx) ctx.letterSpacing = '6px';
  ctx.fillText('GRAMMAX', PADDING, 140);
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';

  ctx.fillStyle = colors.muted;
  ctx.font = fontOf(600, 24);
  ctx.textAlign = 'right';
  ctx.fillText('TYPING GAME', CARD_WIDTH - PADDING, 140);
  ctx.textAlign = 'left';

  ctx.fillStyle = won ? colors.paper : colors.signal;
  ctx.font = fontOf(600, 30);
  ctx.fillText(won ? 'HOÀN THÀNH' : 'HẾT MẠNG', PADDING, 300);

  const scoreSize = fitScoreSize(ctx, score, CARD_WIDTH - PADDING * 2 - 190);
  ctx.fillStyle = colors.paper;
  ctx.font = fontOf(600, scoreSize);
  ctx.fillText(score, PADDING, 560);
  const scoreWidth = ctx.measureText(score).width;

  ctx.fillStyle = colors.muted;
  ctx.font = fontOf(500, 32);
  ctx.fillText('điểm', PADDING + scoreWidth + 24, 560);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PADDING, 700);
  ctx.lineTo(CARD_WIDTH - PADDING, 700);
  ctx.stroke();

  const stats = [
    ['TỪ ĐÃ HẠ', `${data.hits}/${data.words}`],
    ['CHÍNH XÁC', `${data.accuracy}%`],
    ['TỪ/PHÚT', `${data.wpm}`],
  ];
  stats.forEach(([label, value], index) => {
    const x = PADDING + index * 300;
    ctx.fillStyle = colors.muted;
    ctx.font = fontOf(600, 22);
    ctx.fillText(label, x, 770);
    ctx.fillStyle = colors.paper;
    ctx.font = fontOf(600, 44);
    ctx.fillText(value, x, 830);
  });

  ctx.fillStyle = colors.muted;
  ctx.font = fontOf(400, 28);
  ctx.fillText(`${data.level} · ${data.difficulty} · còn ${data.lives} mạng`, PADDING, 1180);
  ctx.font = fontOf(400, 24);
  ctx.fillText('Học từ vựng tiếng Anh qua trò chơi', PADDING, 1230);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((value) => (value ? resolve(value) : reject(new Error('Could not encode PNG'))), 'image/png');
  });

  return { blob, filename: `grammax-typing-${data.score}-diem.png` };
}

export async function shareResult(data) {
  const { blob, filename } = await createShareImage(data);
  const text = `${data.score} điểm · hạ ${data.hits}/${data.words} từ · chính xác ${data.accuracy}% · ${data.wpm} từ/phút`;
  const title = data.outcome === 'won' ? 'Grammax — hoàn thành' : 'Grammax — kết quả';

  // Mobile gets the native sheet; desktop and unsupported browsers get a file.
  // A cancelled sheet must not then dump a download behind the user's back.
  if (typeof File === 'function' && typeof navigator.canShare === 'function') {
    const file = new File([blob], filename, { type: 'image/png' });
    const shareable = (() => {
      try {
        return navigator.canShare({ files: [file] });
      } catch {
        return false;
      }
    })();
    if (shareable) {
      try {
        await navigator.share({ files: [file], title, text });
        return 'shared';
      } catch (error) {
        if (error?.name === 'AbortError') return 'cancelled';
      }
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'downloaded';
}
