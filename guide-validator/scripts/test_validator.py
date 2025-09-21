#!/usr/bin/env python3
"""
Test script for the Guide Format Validator.
This script tests the validator on example files to ensure it works correctly.
"""

import os
import sys
import subprocess
from pathlib import Path

def run_test(test_name: str, file_path: str, expected_status: str = None):
    """
    Run a test case and report results.
    """
    print(f"\n{'='*50}")
    print(f"Running test: {test_name}")
    print(f"File: {file_path}")
    print(f"{'='*50}")

    # Check if file exists
    if not os.path.exists(file_path):
        print(f"❌ Test file not found: {file_path}")
        return False

    # Run the validator
    try:
        result = subprocess.run([
            sys.executable, 'validate_guides.py', file_path
        ], capture_output=True, text=True, cwd=os.path.dirname(__file__))

        print("STDOUT:")
        print(result.stdout)

        if result.stderr:
            print("STDERR:")
            print(result.stderr)

        # Check exit code
        if expected_status == "PASS" and result.returncode == 0:
            print("✅ Test PASSED - Expected PASS, got PASS")
            return True
        elif expected_status == "FAIL" and result.returncode == 1:
            print("✅ Test PASSED - Expected FAIL, got FAIL")
            return True
        elif expected_status == "ERROR" and result.returncode == 2:
            print("✅ Test PASSED - Expected ERROR, got ERROR")
            return True
        else:
            print(f"❌ Test FAILED - Expected {expected_status}, got exit code {result.returncode}")
            return False

    except Exception as e:
        print(f"❌ Test ERROR - Exception: {e}")
        return False

def main():
    """
    Run all test cases.
    """
    print("Guide Format Validator Test Suite")
    print("=" * 50)

    # Get the directory containing this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    examples_dir = os.path.join(os.path.dirname(script_dir), 'examples')

    # Test cases
    test_cases = [
        {
            'name': 'Good Guide (Should Pass)',
            'file': os.path.join(examples_dir, 'good-guide.md'),
            'expected': 'PASS'
        },
        {
            'name': 'Bad Guide (Should Fail)',
            'file': os.path.join(examples_dir, 'bad-guide.md'),
            'expected': 'FAIL'
        }
    ]

    # Run tests
    passed = 0
    total = len(test_cases)

    for test_case in test_cases:
        if run_test(test_case['name'], test_case['file'], test_case['expected']):
            passed += 1

    # Summary
    print(f"\n{'='*50}")
    print(f"Test Summary: {passed}/{total} tests passed")
    print(f"{'='*50}")

    if passed == total:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed!")
        return 1

if __name__ == '__main__':
    sys.exit(main())
