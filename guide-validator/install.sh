#!/bin/bash
# Guide Format Validator Installation Script

set -e  # Exit on any error

echo "Guide Format Validator Installation"
echo "=================================="

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    echo "Please install Python 3 and try again."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"

# Check if pip is available
if ! command -v pip3 &> /dev/null && ! command -v pip &> /dev/null; then
    echo "❌ pip is required but not installed."
    echo "Please install pip and try again."
    exit 1
fi

# Use pip3 if available, otherwise pip
PIP_CMD="pip3"
if ! command -v pip3 &> /dev/null; then
    PIP_CMD="pip"
fi

echo "✅ pip found: $PIP_CMD"

# Install requirements
echo ""
echo "Installing Python dependencies..."
$PIP_CMD install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Make scripts executable
echo ""
echo "Making scripts executable..."
chmod +x scripts/validate_guides.py
chmod +x scripts/test_validator.py

echo "✅ Scripts made executable"

# Test installation
echo ""
echo "Testing installation..."
cd scripts
python3 test_validator.py

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Installation completed successfully!"
    echo ""
    echo "Usage:"
    echo "  python3 scripts/validate_guides.py <guide-file.md>"
    echo "  python3 scripts/validate_guides.py <guide-file.md> --use-llm"
    echo ""
    echo "For more information, see README.md"
else
    echo ""
    echo "⚠️  Installation completed but tests failed."
    echo "Check the error messages above and try running:"
    echo "  python3 scripts/test_validator.py"
fi
