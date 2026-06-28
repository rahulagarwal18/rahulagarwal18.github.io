document.addEventListener('DOMContentLoaded', () => {
    // Mouse cursor glowing orb effect
    const mouseGlow = document.getElementById('mouseGlow');
    window.addEventListener('mousemove', (e) => {
        mouseGlow.style.left = `${e.clientX}px`;
        mouseGlow.style.top = `${e.clientY}px`;
    });

    // Control selectors
    const blurSlider = document.getElementById('blurSlider');
    const opacitySlider = document.getElementById('opacitySlider');
    const colorSlider = document.getElementById('colorSlider');
    const borderSlider = document.getElementById('borderSlider');
    const radiusSlider = document.getElementById('radiusSlider');
    const glowSlider = document.getElementById('glowSlider');

    // Label indicators
    const valBlur = document.getElementById('valBlur');
    const valOpacity = document.getElementById('valOpacity');
    const valHue = document.getElementById('valHue');
    const valBorder = document.getElementById('valBorder');
    const valRadius = document.getElementById('valRadius');
    const valGlow = document.getElementById('valGlow');

    // Preview Target & Output
    const previewCard = document.getElementById('previewCard');
    const cssOutput = document.getElementById('cssOutput');
    const copyCssBtn = document.getElementById('copyCssBtn');

    function updateStyles() {
        const blur = blurSlider.value;
        const opacity = (opacitySlider.value / 100).toFixed(2);
        const hue = colorSlider.value;
        const borderOpacity = (borderSlider.value / 100).toFixed(2);
        const radius = radiusSlider.value;
        const glow = glowSlider.value;

        // Label updates
        valBlur.innerText = blur;
        valOpacity.innerText = opacity;
        valHue.innerText = hue;
        valBorder.innerText = borderOpacity;
        valRadius.innerText = radius;
        valGlow.innerText = glow;

        // Apply style to preview
        const bgStyle = `rgba(255, 255, 255, ${opacity})`;
        const backdropFilter = `blur(${blur}px)`;
        const borderStyle = `1px solid rgba(255, 255, 255, ${borderOpacity})`;
        const borderRadiusStyle = `${radius}px`;
        
        let shadowStyle = 'none';
        if (glow > 0) {
            shadowStyle = `0 20px 50px rgba(0, 0, 0, 0.3), 0 0 ${glow}px hsla(${hue}, 100%, 50%, 0.15)`;
        }

        previewCard.style.backgroundColor = bgStyle;
        previewCard.style.backdropFilter = backdropFilter;
        previewCard.style.webkitBackdropFilter = backdropFilter;
        previewCard.style.border = borderStyle;
        previewCard.style.borderRadius = borderRadiusStyle;
        previewCard.style.boxShadow = shadowStyle;

        // Update CSS Code Output block
        const codeText = `.glass-card {
  background: rgba(255, 255, 255, ${opacity});
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border: 1px solid rgba(255, 255, 255, ${borderOpacity});
  border-radius: ${radius}px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3)${glow > 0 ? `, 0 0 ${glow}px hsla(${hue}, 100%, 50%, 0.15)` : ''};
}`;
        cssOutput.innerText = codeText;
    }

    // Attach Input Event Listeners
    [blurSlider, opacitySlider, colorSlider, borderSlider, radiusSlider, glowSlider].forEach(slider => {
        slider.addEventListener('input', updateStyles);
    });

    // Copy CSS clipboard feature
    copyCssBtn.addEventListener('click', () => {
        const text = cssOutput.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = copyCssBtn.innerHTML;
            copyCssBtn.innerHTML = '<span><i class="fas fa-check"></i> COPIED!</span>';
            copyCssBtn.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                copyCssBtn.innerHTML = originalHTML;
                copyCssBtn.style.backgroundColor = '';
            }, 1800);
        }).catch(err => {
            console.error('Failed to copy code: ', err);
            alert('Failed to copy CSS to clipboard.');
        });
    });

    // Initialize layout values on load
    updateStyles();
});
