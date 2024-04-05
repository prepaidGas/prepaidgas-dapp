const textRefactor = (text: string, size: number) => {
  return `${text.split(' ').slice(0, size).join(' ')}...`;
};

const chartLinearGradient = (canvas: HTMLCanvasElement, height: number, color: any) => {
  const ctx:any = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, `${color.start}`);
  gradient.addColorStop(1, `${color.end}`);
  return gradient;
};

const customTooltips = (context:any) => {
  // Tooltip Element
  let chartContainer: HTMLElement | null = context.chart.canvas.closest('.hexadash-chart-container');
  let tooltipEl: HTMLElement | null = chartContainer?.querySelector('.chartjs-tooltip') || null;

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.className =
      'chartjs-tooltip absolute bg-white dark:bg-[#323541] min-w-[140px] px-1.5 py-2 rounded-md dark:border-white/10 dark:border-[#323541] border-1 shadow-custom dark:shadow-none dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] before:absolute before:border-x-5 before:border-t-5 before:border-transparent before:border-t-gray-200 before:rounded-full before:-bottom-1.5 ltr:before:left-1/2 rtl:before:right-1/2 before:-translate-x-2/45';
    tooltipEl.innerHTML = '<table></table>';

    if (chartContainer && chartContainer.contains(tooltipEl)) {
      tooltipEl?.remove();
    }

    if (chartContainer) {
      chartContainer.appendChild(tooltipEl);
    }
  }
  
  const tooltipModel = context.tooltip;
  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = '0';
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  function getBody(bodyItem:any) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map(getBody);

    let innerHtml = '<thead>';

    titleLines.forEach(function (title:string) {
      innerHtml += `<div class='mb-1 text-body dark:text-white/[.87] text-xs font-medium capitalize'>${title}</div>`;
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function (body:any, i:number) {
      const colors = tooltipModel.labelColors[i];
      let style = `background:${colors.backgroundColor}`;
      style += `; border-color:${colors.borderColor}`;
      style += '; border-width: 2px';
      style += '; border-radius: 30px';
      const span = `<span class="inline-block w-[10px] h-[10px] ltr:mr-2 rtl:ml-2 dark:!border-transparent" style="${style}"></span>`;
      innerHtml += `<tr><td class="flex items-center mb-[3px] text-light-extra dark:text-white/60 text-xs font-medium">${span}${body}</td></tr>`;
    });

    innerHtml += '</tbody>';

    const tableRoot:HTMLElement | null = tooltipEl.querySelector('table'); 
    if (tableRoot) {  
      tableRoot.innerHTML = innerHtml;
    }
  }

  const tooltipTop = tooltipModel.y;
  const tooltipLeft = tooltipModel.x - 10;
  const toolTip = chartContainer && chartContainer.querySelector('.chartjs-tooltip');
  const toolTipHeight = toolTip?.clientHeight || 0;
  const toolTipWidth = toolTip?.clientWidth || 0;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = '1';
  tooltipEl.style.left = `${tooltipLeft + toolTipWidth}px`;
  tooltipEl.style.top = `${
    tooltipTop - (tooltipTop > 10 ? (toolTipHeight > 100 ? toolTipHeight - 70 : toolTipHeight - 50) : 60)
  }px`;
  tooltipEl.style.fontFamily = tooltipModel.options.bodyFontFamily;
  tooltipEl.style.fontSize = `${tooltipModel.options.bodyFontSize}px`;
  tooltipEl.style.fontStyle = tooltipModel.options.bodyFontStyle;
  tooltipEl.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
};

export { textRefactor, chartLinearGradient, customTooltips };
